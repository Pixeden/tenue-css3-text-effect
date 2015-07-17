# Tenue CSS `text-shadow` effect

This is a subtle css `text-shadow` based effect inspired by [this](http://www.pixeden.com/photoshop-text-effects/tenue-psd-text-effect) version.

The effect creates a very elegant and stunning result with a mix of shadows and light. You can use your own text with ease and edit the effect to make it your own.

# [Download](http://www.pixeden.com/html-css/tenue-css3-text-effect)
# [Demo](http://themes-pixeden.com/playground/text/tenue/)

### Usage and customization:
Just add the `pe-tenue.css` file to your project and use the `tenue-shadow` class to apply the default effect on each elements according to your needs.

The effect was created especially with the idea that you can create your own style and effect with ease using the `tenue-shadow()` Sass function.

To create a new effect compile the `src/styles` folder after achieving the desired effect adjusting the different function arguments in the file `_objects.scss`.

If you're not familiar with Sass you can still create your own custom version of the Tenue effect. Using [this pen](http://codepen.io/elrumordelaluz/pen/44612744872264ba0b0f9c79b9b108bc/?editors=110) adjust the different function arguments until satisfied. Then press the button "view compiled" on the SCSS section to obtain the plain CSS code. Copy paste this code into your project CSS file.

[Video tutorial](https://www.youtube.com/watch?v=OH7Ip2QWTzY)

### Function arguments
    
    .tenue-shadow {
      text-shadow: tenue-shadow(
        $steps: 70,               // [1]
        $ratio: .0034,            // [2]
        $op: .75,                 // [3]
        $angle: -133deg,          // [4]
        $color: #000,             // [5]
        $bg: white                // [6]
        );
    }

1. Steps max 128, high numbers negatively impacts performance `[default: 70]` `[unitless]`
2. Magic fraction to control space between shadow steps `[default: .005]` `[unitless]`
3. Opacity applied to each shadow step.`[default: .85]` `[unitless]`
4. Angle calculated to generate the x and y axes.`[default: -133deg]` `[deg]`
5. Starter color (usually the same or similar as the text `color` value).`[default: #000]` `[valid color value]`
6. Color to which the shadows blend(usually the same as the `background-color` value) `[default:null]` `[valid color value]`

&copy; 2015 [Pixeden](http://www.pixeden.com/) | [License](http://www.pixeden.com/license)
