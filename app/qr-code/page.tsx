export default function QRCodePage() {
  return (
    <div className="bg-white w-[210mm] h-[297mm] mx-auto flex flex-col items-center justify-center p-8 print:shadow-none">
      <h1 className="text-6xl font-bold mb-16 text-center text-[#1f3470]">
        CADEAU NOEL
      </h1>

      <div className="w-64 h-64">
        <img src="/qrcode.png" alt="QR Code" className="w-full h-full" />
      </div>
    </div>
  );
}
