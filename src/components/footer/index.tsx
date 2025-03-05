const Footer = () => {
    return (

        <footer className="h-14 bg-white flex items-center justify-around shadow-md border-t">
        <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
       
          <span className="text-xs">Crédito</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          
          <span className="text-xs">Config</span>
        </button>
      </footer>
    );
};

export default Footer;
