import Logo from "../assets/logo.webp";

const Header = () => {
  return (
    <header className="w-full text-white bg-black items-center">
      <div className="h-20 max-w-[1200px] m-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="logo" className="w-10" />
          <h2 className="text-xl font-semibold">Salk AI</h2>
        </div>
      </div>
    </header>
  );
};

export default Header;
