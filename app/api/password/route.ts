import { NextRequest, NextResponse } from 'next/server';

const findPassword = async (req: NextRequest) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { password } = await req.json();

  if (password === process.env.CODE_PASSWORD) {
    return NextResponse.json({
      error: false,
      code: process.env.PLAYSTATION_CODE,
    });
  }

  return NextResponse.json({ error: true });
};

export { findPassword as POST };
