import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    padding: 32,
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 214,
    height: 120,
    marginTop: 74,
    marginBottom: 48,
  },
  button: {
    width: '100%',
    height: 36,
    borderRadius: 6,
    backgroundColor: THEME.COLORS.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    marginStart: 8,
    color: THEME.COLORS.TEXT,
    fontFamily: THEME.FONT_FAMILY.SEMI_BOLD,
    fontSize: THEME.FONT_SIZE.SM,
  }
});
