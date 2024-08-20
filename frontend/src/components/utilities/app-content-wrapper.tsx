interface IAppContentWrapperProps {
  children: React.ReactNode;
}

export function AppContentWrapper(props: Readonly<IAppContentWrapperProps>) {
  const { children } = props;

  return (
    <div
      id="app-content-wrapper"
      className="w-full h-full flex flex-col gap-4 px-6 py-4 md:px-8"
    >
      {children}
    </div>
  );
}
