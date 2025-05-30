// precision mediump float;
// uniform vec4 u_color;

// void main()
// {
//     gl_FragColor = u_color;
// }

precision highp float;
uniform vec4 u_color;
uniform float z_offset;
// uniform vec4 u_borderColor;
// uniform float u_borderWidth;
// uniform vec2 u_resolution;

void main() 
{
    // vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    // vec2 borderUV = smoothstep(vec2(0.0), vec2(u_borderWidth), uv) * 
    //                 smoothstep(vec2(0.0), vec2(u_borderWidth), vec2(1.0) - uv);
    // float borderMask = borderUV.x * borderUV.y;
    // vec4 color = mix(u_color, u_borderColor, borderMask);
    // color.w = 1.0;
    // gl_FragColor = color;

    gl_FragColor = u_color;
    // gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    // gl_FragColor = vec4(z_offset, 0.0, 0.0, 1.0);
}
