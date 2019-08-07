// @flow

import color from 'color';
import { Platform, Dimensions, PixelRatio } from 'react-native';

import { PLATFORM } from './commonColor';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;
const platformStyle = PLATFORM.MATERIAL;
const isIphoneX =
    platform === PLATFORM.IOS &&
    (deviceHeight === 812 ||
        deviceWidth === 812 ||
        deviceHeight === 896 ||
        deviceWidth === 896);

export default {
    platformStyle,
    platform,

    // Accordion
    headerStyle: '#edebed',
    iconStyle: '#000',
    contentStyle: '#f5f4f5',
    expandedIconStyle: '#000',
    accordionBorderColor: '#d3d3d3',

    // ActionSheet
    elevation: 4,
    containerTouchableBackgroundColor: 'rgba(0,0,0,0.4)',
    innerTouchableBackgroundColor: '#fff',
    listItemHeight: 50,
    listItemBorderColor: 'transparent',
    marginHorizontal: -15,
    marginLeft: 14,
    marginTop: 15,
    minHeight: 56,
    padding: 15,
    touchableTextColor: '#757575',

    // Android
    androidRipple: true,
    androidRippleColor: 'rgba(256, 256, 256, 0.3)',
    androidRippleColorDark: 'rgba(0, 0, 0, 0.15)',
    buttonUppercaseAndroidText: true,

    // Badge
    badgeBg: 'rgba(189,195,199,1)',
    badgeColor: '#fff',
    badgePadding: 3,

    // Button
    buttonFontFamily: 'Roboto',
    buttonDisabledBg: 'rgba(189,195,199,1)',
    buttonPadding: 6,
    get buttonPrimaryBg() {
        return this.brandPrimary;
    },
    get buttonPrimaryColor() {
        return this.inverseTextColor;
    },
    get buttonInfoBg() {
        return this.brandInfo;
    },
    get buttonInfoColor() {
        return this.inverseTextColor;
    },
    get buttonSuccessBg() {
        return this.brandSuccess;
    },
    get buttonSuccessColor() {
        return this.inverseTextColor;
    },
    get buttonDangerBg() {
        return this.brandDanger;
    },
    get buttonDangerColor() {
        return this.inverseTextColor;
    },
    get buttonWarningBg() {
        return this.brandWarning;
    },
    get buttonWarningColor() {
        return this.inverseTextColor;
    },
    get buttonTextSize() {
        return this.fontSizeBase - 1;
    },
    get buttonTextSizeLarge() {
        return this.fontSizeBase * 1.5;
    },
    get buttonTextSizeSmall() {
        return this.fontSizeBase * 0.8;
    },
    get borderRadiusLarge() {
        return this.fontSizeBase * 3.8;
    },
    get iconSizeLarge() {
        return this.iconFontSize * 1.5;
    },
    get iconSizeSmall() {
        return this.iconFontSize * 0.6;
    },

    // Card
    cardDefaultBg: '#fff',
    cardBorderColor: '#ccc',
    cardBorderRadius: 2,
    cardItemPadding: platform === PLATFORM.IOS ? 10 : 12,

    // CheckBox
    CheckboxRadius: 0,
    CheckboxBorderWidth: 2,
    CheckboxPaddingLeft: 2,
    CheckboxPaddingBottom: 5,
    CheckboxIconSize: 16,
    CheckboxIconMarginTop: 1,
    CheckboxFontSize: 17,
    checkboxBgColor: '#34495e',
    checkboxSize: 20,
    checkboxTickColor: '#fff',

    // Color
    brandPrimary: '#34495e',
    brandInfo: '#3F57D3',
    brandSuccess: '#5cb85c',
    brandDanger: '#d9534f',
    brandWarning: '#f0ad4e',
    brandDark: '#000',
    brandLight: 'rgba(236,240,241,1)',

    // Container
    containerBgColor: '#fff',

    // Date Picker
    datePickerTextColor: '#000',
    datePickerBg: 'transparent',

    // FAB
    fabWidth: 56,

    // Font
    DefaultFontSize: 16,
    fontFamily: 'Roboto',
    fontSizeBase: 16,
    fontSizeH1: 28,
    fontSizeH2: 22,
    fontSizeH3: 18,

    // Footer
    footerHeight: 55,
    footerDefaultBg: 'rgba(52,73,94,1)',
    footerPaddingBottom: 0,

    // FooterTab
    tabBarTextColor: '#bfc6ea',
    tabBarTextSize: 12,
    activeTab: '#fff',
    sTabBarActiveTextColor: 'rgba(72,84,96,1)',
    tabBarActiveTextColor: 'rgba(236,240,241,1)',
    tabActiveBgColor: 'rgba(44,62,80,1)',

    // Header
    toolbarBtnColor: '#fff',
    toolbarDefaultBg: 'rgba(52,73,94,1)',
    toolbarHeight: 64,
    toolbarSearchIconSize: 20,
    toolbarInputColor: '#fff',
    searchBarHeight: platform === PLATFORM.IOS ? 30 : 40,
    searchBarInputHeight: platform === PLATFORM.IOS ? 40 : 50,
    toolbarBtnTextColor: '#fff',
    toolbarDefaultBorder: 'rgba(189,195,199,1)',
    iosStatusbar: 'light-content',
    statusBarColor: 'rgba(52,73,94,1)',
    get darkenHeader() {
        return color(this.tabBgColor)
            .darken(0.03)
            .hex();
    },

    // Icon
    iconFamily: 'Ionicons',
    iconFontSize: 28,
    iconHeaderSize: 24,

    // InputGroup
    inputFontSize: 17,
    inputBorderColor: 'rgba(44,62,80,1)',
    inputSuccessBorderColor: 'rgba(5,196,107,1)',
    inputErrorBorderColor: 'rgba(231,76,60,1)',
    inputHeightBase: 50,
    get inputColor() {
        return this.textColor;
    },
    get inputColorPlaceholder() {
        return 'rgba(52,73,94,1)';
    },

    // Line Height
    buttonLineHeight: 19,
    lineHeightH1: 32,
    lineHeightH2: 24,
    lineHeightH3: 22,
    lineHeight: 22,

    // List
    listBg: 'transparent',
    listBorderColor: '#c9c9c9',
    listDividerBg: '#f4f4f4',
    listBtnUnderlayColor: '#DDD',
    listItemPadding: 10,
    listNoteColor: 'rgba(128,142,155,1)',
    listNoteSize: 13,
    listItemSelected: 'rgba(44,62,80,1)',

    // Progress Bar
    defaultProgressColor: 'rgba(44,62,80,1)',
    inverseProgressColor: '#1A191B',

    // Radio Button
    radioBtnSize: 23,
    radioSelectedColorAndroid: 'rgba(44,62,80,1)',
    radioBtnLineHeight: 24,
    get radioColor() {
        return this.brandPrimary;
    },

    // Segment
    segmentBackgroundColor: 'rgba(52,73,94,1)',
    segmentActiveBackgroundColor: '#fff',
    segmentTextColor: '#fff',
    segmentActiveTextColor: 'rgba(44,62,80,1)',
    segmentBorderColor: '#fff',
    segmentBorderColorMain: 'rgba(52,73,94,1)',

    // Spinner
    defaultSpinnerColor: 'rgba(44,62,80,1)',
    inverseSpinnerColor: '#1A191B',

    // Tab
    tabDefaultBg: 'rgba(52,73,94,1)',
    topTabBarTextColor: '#b3c7f9',
    topTabBarActiveTextColor: '#fff',
    topTabBarBorderColor: '#fff',
    topTabBarActiveBorderColor: '#fff',

    // Tabs
    tabBgColor: '#F8F8F8',
    tabFontSize: 15,

    // Text
    textColor: 'rgba(72,84,96,1)',
    inverseTextColor: '#fff',
    noteFontSize: 14,
    get defaultTextColor() {
        return this.textColor;
    },

    // Title
    titleFontfamily: 'Roboto',
    titleFontSize: 19,
    subTitleFontSize: 14,
    subtitleColor: 'rgba(236,240,241,1)',
    titleFontColor: '#FFF',

    // Other
    borderRadiusBase: 2,
    borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
    contentPadding: 10,
    dropdownLinkColor: 'rgba(52,73,94,1)',
    inputLineHeight: 24,
    deviceWidth,
    deviceHeight,
    isIphoneX,
    inputGroupRoundedBorderRadius: 30,

    // iPhoneX SafeArea
    Inset: {
        portrait: {
            topInset: 24,
            leftInset: 0,
            rightInset: 0,
            bottomInset: 34
        },
        landscape: {
            topInset: 0,
            leftInset: 44,
            rightInset: 44,
            bottomInset: 21
        }
    }
};
