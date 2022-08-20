export const navGoBack = (_navigation: any) => {
    if (_navigation.canGoBack()) {
      _navigation.goBack();
    }
  };