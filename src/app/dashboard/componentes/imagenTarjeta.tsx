"use client";

import Image from "next/image";
import { memo } from "react";

interface Props {
    imagenUrl: string;
}

function ImagenTargeta({ imagenUrl }: Props) {
    return (
        <div className="w-full h-[180px] flex items-center justify-center">
            <div className="w-[36px] h-[36px] rounded-2xl overflow-hidden bg-white flex items-center justify-center">
                {imagenUrl ? (
                <Image
                    src={imagenUrl}
                    alt="Imagen del auto"
                    width={36}
                    height={36}
                    className="object-contain"
                    loading="lazy"
                />
                ) : (
                <span className="text-sm bg-gray-100 text-black">Sin imagen</span>
                )}
            </div>
        </div>
    );
}
export default memo(ImagenTargeta);