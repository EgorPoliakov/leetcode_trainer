import React from "react";

function FeatureCard({title, description, icon}) {
    return (
        <div className="mb-12 lg:mb-0">
            <div
            className="block h-full rounded-lg bg-third shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] text-white">
                <div className="flex justify-center">
                    <div className="-mt-8 rounded-full bg-second p-4 text-primary shadow-md">
                    {icon}
                    </div>
                </div>
                <div className="p-6">
                    <h5 className="mb-4 text-lg font-semibold">{title}</h5>
                    <p>
                    {description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default FeatureCard;