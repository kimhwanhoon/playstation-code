'use client';

import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const PlayStationGiftCard = () => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [codeWrote, setCodeWrote] = useState(false);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { error, code: receivedCode } = await fetch('/api/password', {
        method: 'POST',
        body: JSON.stringify({ password }),
      }).then((res) => res.json());

      if (error) {
        setIsPasswordCorrect(false);
        setCodeWrote(true);
      } else {
        setCode(receivedCode);
        setIsPasswordCorrect(true);
        setIsCodeVisible(true);
        setPassword('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCodeWrote(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white w-full min-h-dvh overflow-hidden">
      <div className="relative w-full h-full bg-gradient-to-b from-[#f5f6f8] to-[#e8e9ec] p-4 sm:p-8 flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-8 sm:mb-12">
          <h1 className="text-[#1f3470] text-3xl sm:text-4xl font-bold tracking-wider text-center sm:text-left mb-4 sm:mb-0">
            CARTE
            <br />
            CADEAU
          </h1>
          <div className="flex flex-col items-center sm:items-end gap-2 sm:gap-4">
            <span className="text-[#1f3470] text-5xl sm:text-6xl font-bold">
              20€
            </span>
            <div className="w-10 h-6 sm:w-12 sm:h-8 rounded overflow-hidden shadow-sm">
              <div className="h-full flex">
                <div className="w-1/3 bg-[#002395]"></div>
                <div className="w-1/3 bg-white"></div>
                <div className="w-1/3 bg-[#ED2939]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Personalized Message */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 text-center">
          <h2 className="text-[#1f3470] text-2xl sm:text-3xl font-bold mb-2">
            Pour Jason Cruz
          </h2>
          <p className="text-[#1f3470] text-base sm:text-lg">
            Mon ami, que cette carte soit le début d'une nouvelle aventure
            épique dans le monde PlayStation. Que chaque partie soit remplie de
            joie, de défis et de victoires mémorables !
          </p>
        </div>

        {/* PlayStation Logo */}
        <div className="flex-1 bg-[#00439C] flex flex-col items-center justify-center py-6 sm:py-10 px-4 sm:px-8 rounded-lg">
          <div className="w-24 sm:w-32 h-24 sm:h-32 mb-4 sm:mb-6">
            <svg viewBox="0 0 24 24" fill="white" className="w-full h-full">
              <path d="M8.984 2.596v17.547l3.915 1.261V6.688c0-.69.304-1.151.794-.991.636.181.76.814.76 1.505v5.876c2.441 1.193 4.362-.002 4.362-3.153 0-3.237-1.126-4.675-4.438-5.827-1.307-.448-3.728-1.186-5.391-1.502h-.002z" />
            </svg>
          </div>
          <h2 className="text-white text-2xl sm:text-4xl font-light mb-6 sm:mb-8">
            PlayStation
          </h2>

          {/* Code Display */}
          <div className="bg-white/10 backdrop-blur-sm text-white rounded-lg p-4 sm:p-5 mb-4 sm:mb-6 w-full max-w-sm mx-auto">
            <p className="text-base sm:text-lg mb-1">Ton code cadeau :</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full text-xl font-medium sm:text-2xl font-mono tracking-wider text-gray-700"
                >
                  {isCodeVisible ? code : '****-****-****'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <h3 className="font-semibold">Entrez le mot de passe</h3>
                  <Input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <div className="w-4 h-4 animate-spin border-2 border-white/20 border-t-white rounded-full"></div>
                    ) : (
                      'Afficher le code'
                    )}
                  </Button>
                  {!isPasswordCorrect && codeWrote && (
                    <p className="text-red-500 text-sm">
                      Mot de passe incorrect
                    </p>
                  )}
                </form>
              </PopoverContent>
            </Popover>
          </div>

          {/* Description */}
          <p className="text-white text-center text-sm sm:text-base max-w-2xl leading-relaxed px-2 sm:px-4">
            À utiliser pour tout le contenu du PlayStation™Store : jeux, contenu
            additionnel, abonnements et bien plus. Profite-en pour découvrir de
            nouveaux mondes, Jason !
          </p>

          {/* Bottom Icons */}
          <div className="flex items-center gap-4 sm:gap-6 mt-6 sm:mt-8">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#f7b239] rounded-lg flex items-center justify-center">
              <span className="text-black text-lg sm:text-xl font-bold">+</span>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 sm:w-6 sm:h-6 text-[#00439C]"
                fill="currentColor"
              >
                <path d="M8.984 2.596v17.547l3.915 1.261V6.688c0-.69.304-1.151.794-.991.636.181.76.814.76 1.505v5.876c2.441 1.193 4.362-.002 4.362-3.153 0-3.237-1.126-4.675-4.438-5.827-1.307-.448-3.728-1.186-5.391-1.502h-.002z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center text-[#1f3470] text-xs sm:text-sm mt-4 px-2 sm:px-4">
          <p>
            PlayStation®Plus est un abonnement payant à durée indéfinie et des
            frais récurrents seront facturés.
          </p>
          <p>Pour plus de détails, voir au dos. Amuse-toi bien, Jason !</p>
        </div>
      </div>
    </div>
  );
};

export default PlayStationGiftCard;
