import Logo from "../assets/logo.webp";

const Header = () => {
  return (
    <header className="mx-auto max-w-[1250px] h-20 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img src={Logo} alt="logo" className="w-10" />
        <h2 className="text-xl font-medium">Salk AI</h2>
      </div>
    </header>
  );
};

export default Header;
