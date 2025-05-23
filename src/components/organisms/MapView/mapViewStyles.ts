import { Dimensions, StyleSheet } from "react-native";
import { FONT_FAMILY, FONT_SIZE } from "../../../constants/font";
import { spacing } from "../../../constants/spacing";
import { themes } from "../../../styles/theming";
import { normalizeFont } from "../../../utils/normalizeFont";

const { width, height } = Dimensions.get('window');
const DEFAULT_MAP_HEIGHT = height * 0.25; 

export const mapViewStyles = (
  theme: typeof themes.lightTheme | typeof themes.darkTheme,
) => StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: DEFAULT_MAP_HEIGHT,
    borderRadius: spacing.radius_md,
    borderWidth: 1,
    borderColor: theme.border,
  },
  mapPlaceholder: {
    backgroundColor: theme.border,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  mapText: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: normalizeFont(FONT_SIZE.SM),
    color: theme.text,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  coordinatesText: {
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    fontSize: normalizeFont(FONT_SIZE.SM),
    color: theme.text,
    marginVertical: spacing.xs,
  },
  marker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${theme.cardBackground}CC`,
    padding: spacing.sm,
    borderRadius: spacing.radius_md,
    marginTop: spacing.sm,
  },
  markerText: {
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    fontSize: normalizeFont(FONT_SIZE.SM),
    color: theme.text,
    marginLeft: spacing.xs,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },  loadingText: {
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    fontSize: normalizeFont(FONT_SIZE.SM),
    color: theme.text,
    marginTop: spacing.sm,
  },  customMarkerContainer: {
    backgroundColor: `${theme.background}CC`,
    borderRadius: 50,
    padding: 6,
    borderWidth: 2,
    borderColor: theme.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  calloutContainer: {
    width: 200,
    backgroundColor: theme.cardBackground,
    borderRadius: 6,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: theme.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  calloutTitle: {
    fontFamily: FONT_FAMILY.POPPINS_MEDIUM,
    fontSize: normalizeFont(FONT_SIZE.SM),
    color: theme.text,
    marginBottom: spacing.xs,
  },
  calloutText: {
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    fontSize: normalizeFont(FONT_SIZE.XS),
    color: theme.subheadingText,
  },
});