"use client"

import React from 'react'
import Flickity from 'react-flickity-component'

export default function CarouselImages() {
    return (
        <div id="details-images" className="main-carousel mt-[30px]">
            <Flickity options={{ cellAlign: 'left', contain: true, pageDots: false, prevNextButtons: false }}>
                {[0, 1, 2].map((item) => (
                    <div key={item} className="image-card pr-5 first-of-type:pl-[calc((100vw-1130px-20px)/2)]">
                        <div className="bg-white w-[470px] h-[350px] p-10 flex shrink-0 border border-[#E5E5E5] justify-center items-center rounded-[30px] overflow-hidden">
                            <img src="/assets/thumbnails/color_back_green__buxxfjccqjzm_large_2x-Photoroom 1.png" className="w-full h-full object-contain" alt="thumbnail" />
                        </div>
                    </div>
                ))}
            </Flickity>
        </div>
    )
}
