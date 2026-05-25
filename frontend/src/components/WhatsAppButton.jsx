const WHATSAPP_NUMBER = '917355419508'; // Add your WhatsApp number here, e.g. '919XXXXXXXXX'
const PREFILLED_MESSAGE = encodeURIComponent(
  'Hi Aditya, I came across your impressive portfolio and would love to connect!'
);

export default function WhatsAppButton() {
  if (!WHATSAPP_NUMBER) return null;

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${PREFILLED_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      title="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}
