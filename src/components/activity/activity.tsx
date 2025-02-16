"use client";

import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface ActivityCardProps {
  title: string;
  description: string;
  link: string;
  borderColor: string;
  textColor: string;
}


//   const ActivityCard = ({ title, description, link, borderColor, textColor }: ActivityCardProps) => {
//     const router = useRouter();
  
//     return (
//       <div className={`border-l-4 ${borderColor} bg-white p-4 rounded-lg shadow-md flex flex-col justify-between w-full`}>
//         <div>
//           <p className="text-lg font-semibold">{title}</p>
//           <p className="text-sm mt-1 text-gray-600">{description}</p>
//         </div>
//         <button
//           className={`font-extrabold ${textColor} text-2xl self-end`}
//           onClick={() => router.push(link)}
//         >
//           <ChevronRight />
//         </button>
//       </div>
//     );
//   };

const ActivityCard = ({ title, description, link, borderColor, textColor }: ActivityCardProps) => {
    const router = useRouter();
  
    return (
      <div className={`border ${borderColor} p-4 rounded-lg shadow-md flex flex-col justify-between`}>
        <div>
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-sm mt-2">{description}</p>
        </div>
        <button
          className={`font-extrabold ${textColor} text-3xl self-end`}
          onClick={() => router.push(link)}
        >
          <ChevronRight />
        </button>
      </div>
    );
  };

  

const ActivitySection = () => {
  const router = useRouter();

  return (
    <div className="w-full max-w-lg mx-auto bg-gray-100 p-6 rounded-xl shadow-md flex flex-col gap-6">
      {/* Sección Recursos */}
      <div className="flex flex-col gap-4">
        <p className="text-xl font-bold text-gray-800">Recursos</p>
        <div className="rounded-lg bg-white shadow-md flex flex-col items-start p-5 w-full">
          <p className="font-bold text-lg text-gray-900">Hecha un vistazo a Alza</p>
          <p className="text-gray-600 text-sm mt-2">
            Alza es una biblioteca diseñada para aprender sobre habilidades blandas y cómo aplicarlas.
          </p>
          <button
            onClick={() => router.push("/library")}
            className="bg-blue-600 hover:bg-blue-500 transition duration-300 text-white font-bold py-2 px-4 rounded-md mt-4"
          >
            Ir a Alza
          </button>
        </div>
      </div>

      {/* Sección Actividades */}
      <div className="flex flex-col gap-4">
        <p className="text-xl font-bold text-gray-800">Actividades</p>
        <ActivityCard
          title="Banco de actividades"
          description="Puedes encontrar diversas actividades para aplicar en tu clase."
          link="/bank"
          borderColor="border-green-500"
          textColor="text-green-500"
        />
        <ActivityCard
          title="Generador de Actividades"
          description="Crea actividades con Zera potenciado por Inteligencia Artificial."
          link="/creation/generator"
          borderColor="border-yellow-500"
          textColor="text-yellow-500"
        />
        <ActivityCard
          title="Creador de actividades"
          description="Crea tus propias actividades implementando las habilidades blandas."
          link="/creation/creator"
          borderColor="border-purple-500"
          textColor="text-purple-500"
        />
      </div>
    </div>
  );
};

export default ActivitySection;
