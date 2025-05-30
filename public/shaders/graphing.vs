precision highp float;
attribute vec2 raw_coordinates;
uniform float point_size;
uniform float min_x;
uniform float max_x;
uniform float min_y;
uniform float max_y;
uniform float x_offset;
uniform float y_offset;
uniform float z_offset;
uniform mat4 modelview_matrix;

void main(void)
{
    gl_PointSize = point_size;
    lowp float x_range = max_x - min_x;
    lowp float y_range = max_y - min_y;
    float x_position = (((raw_coordinates.x + x_offset - min_x) / x_range) * 2.0) - 1.0;
    float y_position;
    float z_position = z_offset;

    if (y_range > 0.0)
    {
        y_position = (((raw_coordinates.y + y_offset - min_y) / y_range) * 2.0) - 1.0;
    }
    else
    {
        y_position = 0.0;
    }

    gl_Position = modelview_matrix * vec4(x_position, y_position, z_position, 1.0);
}
