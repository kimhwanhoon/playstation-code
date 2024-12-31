'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const QRGenerator = () => {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { qrcode, error } = await fetch(`/api/qrcode?url=${url}`, {
      method: 'GET',
    }).then((res) => res.json());

    if (error) {
      console.error('Error generating QR code:', error);
      return;
    }

    const link = document.createElement('a');
    link.href = qrcode;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Enter URL to generate QR code"
            className="w-full"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Generate QR Code
        </Button>
      </form>
    </div>
  );
};

export default QRGenerator;
