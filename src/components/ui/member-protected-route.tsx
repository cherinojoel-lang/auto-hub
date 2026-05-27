import { ReactNode } from 'react';

interface SignInProps {
  title?: string;
  message?: string;
  className?: string;
  cardClassName?: string;
  buttonClassName?: string;
  buttonText?: string;
}

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
  spinnerClassName?: string;
}

interface MemberProtectedRouteProps {
  children: ReactNode;

  // Simple props for quick customization
  messageToSignIn?: string;
  messageToLoading?: string;
  signInTitle?: string;
  signInClassName?: string;
  loadingClassName?: string;

  // Advanced prop objects for full customization
  signInProps?: Partial<SignInProps>;
  loadingSpinnerProps?: Partial<LoadingSpinnerProps>;
}

export function MemberProtectedRoute({
  children,
  messageToSignIn = "Dieser Bereich ist ohne Login erreichbar.",
  messageToLoading = "Seite wird geladen...",
  signInTitle = "Kein Login erforderlich",
  signInClassName = "",
  loadingClassName = "",
  signInProps = {},
  loadingSpinnerProps = {}
}: MemberProtectedRouteProps) {
  void messageToSignIn;
  void messageToLoading;
  void signInTitle;
  void signInClassName;
  void loadingClassName;
  void signInProps;
  void loadingSpinnerProps;
  return <>{children}</>;
}
