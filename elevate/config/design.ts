//Design System Token Imports 

//Elevate Utility Imports
import { dimensionUtility } from "../core/system/etc/dimension.js";

//Example Custom Values Import
import { BrandColors } from "../design/example-brandTokens.js";
import { clientColors } from "../design/client-colors.js";

//System Standard Imports
import { colors } from "../core/system/design/colors.js";
import { spacing } from "../core/system/design/spacing.js";
import { typography } from "../core/system/design/typography.js";
import { breakpoints } from '../core/system/design/breakpoints.js';
import { effects } from '../core/system/design/effects.js';
import { clientFonts } from '../design/client-fonts.js';

//Token Definitions
export const designSystem = {
    ColorToken: clientColors,
    BreakPointToken: breakpoints,
    SpacingToken: {...spacing,...dimensionUtility},
    FontSizeToken: typography.size,
    FontFamilyToken:clientFonts,
    LineHeightToken: typography.leading,
    LetterSpacingToken: typography.tracking,
    MeasureToken: typography.measure,
    FontWeightToken: typography.weight,
    ShadowToken: effects.shadows,
    GradientToken: effects.gradients,
    TextShadowToken: effects.textShadows,
    TransitionToken: effects.transitions,
    PatternToken: effects.backgrounds,

    //Spread Custom Token Categories
    ...BrandColors
};