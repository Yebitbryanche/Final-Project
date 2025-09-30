import FAQ_Component from "../../components/FAQ_Component";
import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
  TbCircleNumber4Filled,
} from "react-icons/tb";
import images from "../../types/images";
import { FaWhatsapp } from "react-icons/fa";

function FAQ() {
  return (
    <div className="my-[5rem] flex flex-col gap-12 p-3">
      <FAQ_Component
        title="Register"
        text="Get started by creating an account. Once signed up, you can authenticate your account."
        icon={<TbCircleNumber1Filled className="text-primary" size={40} />}
        image={images.register}
        className="md:flex-row"
      />

      <FAQ_Component
        title="Place Orders and Checkout"
        text="Browse products, add them to your cart, and securely checkout with ease."
        icon={<TbCircleNumber2Filled className="text-primary" size={40} />}
        image={images.order}
        className="md:flex-row-reverse"
      />

      <FAQ_Component
        title="Send Your Receipt"
        text="Send your checkout receipt via WhatsApp for quick payment confirmation."
        icon={<TbCircleNumber3Filled className="text-primary" size={40} />}
        image={images.mail}
        className="md:flex-row"
      />

      <FAQ_Component
        title="Fast Delivery"
        text="Your products will be delivered right to your doorstep in no time."
        icon={<TbCircleNumber4Filled className="text-primary" size={40} />}
        image={images.deliver}
        className="md:flex-row-reverse"
      />

        <a
            href="https://wa.me/237651138159"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-110 animate-bounce"
            >
            <FaWhatsapp size={28} />
        </a>
    </div>
  );
}

export default FAQ;
