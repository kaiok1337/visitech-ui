/**
     * Computes the Fast Fourier Transform for a time series with interleaved time/data format
     * @param {Array<number>} interleavedData - Array in format [time1, value1, time2, value2, ...]
     * @param {string} windowType - Type of window function to apply
     * @returns {Object} Object containing frequencies and their magnitudes
     */
function computeFFT(interleavedData, windowType = "hann") {
    if (interleavedData.length % 2 !== 0) {
      throw new Error("Input array must have even length (interleaved time/data pairs)");
    }
    
    // Extract time and data values
    const times = [];
    const values = [];
    
    for (let i = 0; i < interleavedData.length; i += 2) {
      times.push(interleavedData[i]);
      values.push(interleavedData[i + 1]);
    }
    
    // Apply window function to reduce spectral leakage
    const windowedValues = applyWindow(values, windowType);
    
    // Calculate sampling rate from time differences
    const timeIntervals = [];
    for (let i = 1; i < times.length; i++) {
      timeIntervals.push(times[i] - times[i - 1]);
    }
    
    // Use average time interval to determine sampling rate
    const avgTimeInterval = timeIntervals.reduce((sum, interval) => sum + interval, 0) / timeIntervals.length;
    const samplingRate = 1 / avgTimeInterval;
    
    // Make sure we have a power of 2 length for the FFT
    const nextPow2 = Math.pow(2, Math.ceil(Math.log2(windowedValues.length)));
    
    // Pad the array with zeros to reach the power of 2 length
    const paddedData = [...windowedValues];
    while (paddedData.length < nextPow2) {
      paddedData.push(0);
    }
    
    // Implement the recursive FFT algorithm
    function fft(signal) {
      const n = signal.length;
      
      // Base case
      if (n === 1) {
        return [{ real: signal[0], imag: 0 }];
      }
      
      // Split signal into even and odd indices
      const even = [];
      const odd = [];
      for (let i = 0; i < n; i++) {
        if (i % 2 === 0) {
          even.push(signal[i]);
        } else {
          odd.push(signal[i]);
        }
      }
      
      // Recursive FFT on even and odd parts
      const evenResult = fft(even);
      const oddResult = fft(odd);
      
      // Combine results
      const result = new Array(n);
      for (let k = 0; k < n / 2; k++) {
        // twiddle factor
        const angle = -2 * Math.PI * k / n;
        const twiddle = {
          real: Math.cos(angle),
          imag: Math.sin(angle)
        };
        
        // Complex multiplication: twiddle * oddResult[k]
        const oddComponent = {
          real: twiddle.real * oddResult[k].real - twiddle.imag * oddResult[k].imag,
          imag: twiddle.real * oddResult[k].imag + twiddle.imag * oddResult[k].real
        };
        
        // Combine even and odd parts
        result[k] = {
          real: evenResult[k].real + oddComponent.real,
          imag: evenResult[k].imag + oddComponent.imag
        };
        
        result[k + n / 2] = {
          real: evenResult[k].real - oddComponent.real,
          imag: evenResult[k].imag - oddComponent.imag
        };
      }
      
      return result;
    }
    
    // Compute the FFT
    const fftResult = fft(paddedData);
    
    // Calculate magnitude (amplitude) of each frequency component
    const magnitudes = fftResult.map(complex => 
      Math.sqrt(complex.real * complex.real + complex.imag * complex.imag) / paddedData.length
    );
    
    // Calculate phase for each frequency component
    const phases = fftResult.map(complex => 
      Math.atan2(complex.imag, complex.real)
    );
    
    // Calculate the frequencies corresponding to each FFT bin
    // Only return the first half as the second half is the mirror image (for real signals)
    const frequencies = [];
    const outputMagnitudes = [];
    const outputPhases = [];
    const frequency_magnitude = [];
    
    // Only return up to Nyquist frequency (samplingRate/2)
    const nyquistIndex = Math.floor(nextPow2 / 2);
    
    for (let i = 0; i < nyquistIndex; i++) 
    {
        let frequency = i * samplingRate / nextPow2;
        frequencies.push(frequency);
        let magnitude = magnitudes[i] * 2;
        outputMagnitudes.push(magnitude); // Multiply by 2 to account for the mirrored part
        frequency_magnitude.push(frequency, magnitude);
        outputPhases.push(phases[i]);
    }
    
    return {
        frequency_magnitude,
        frequencies,
        magnitudes: outputMagnitudes,
        phases: outputPhases,
        times,
        values,
        samplingRate,
        windowType
    };
  }

  /**
   * Function to apply a window function to reduce spectral leakage
   * @param {Array<number>} data - The time series data
   * @param {string} windowType - The type of window ("hann", "hamming", "blackman", "rectangular")
   * @returns {Array<number>} The windowed data
   */
  function applyWindow(data, windowType = "hann") {
    const N = data.length;
    const windowed = new Array(N);
    
    switch (windowType.toLowerCase()) {
      case "hann":
        for (let i = 0; i < N; i++) {
          windowed[i] = data[i] * (0.5 * (1 - Math.cos(2 * Math.PI * i / (N - 1))));
        }
        break;
      case "hamming":
        for (let i = 0; i < N; i++) {
          windowed[i] = data[i] * (0.54 - 0.46 * Math.cos(2 * Math.PI * i / (N - 1)));
        }
        break;
      case "blackman":
        for (let i = 0; i < N; i++) {
          windowed[i] = data[i] * (0.42 - 0.5 * Math.cos(2 * Math.PI * i / (N - 1)) + 
                                    0.08 * Math.cos(4 * Math.PI * i / (N - 1)));
        }
        break;
      case "rectangular":
      default:
        return [...data]; // No windowing
    }
    
    return windowed;
  }
