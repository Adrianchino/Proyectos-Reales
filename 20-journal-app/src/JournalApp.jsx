import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./Theme";


export const JournalApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};