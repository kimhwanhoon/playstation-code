import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import QRCode from 'qrcode';

export const GET = async (req: NextRequest) => {
  const url = req.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: true });
  }

  try {
    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(url);

    return NextResponse.json({
      error: false,
      qrcode: qrCodeDataUrl,
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    return NextResponse.json({ error: true });
  }
};
