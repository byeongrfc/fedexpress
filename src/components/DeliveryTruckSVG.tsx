const DeliveryTruckSVG = () => {
  return (
    <svg
      width="400"
      height="300"
      viewBox="0 0 400 300"
      className="w-full max-w-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background clouds */}
      <circle
        cx="80"
        cy="40"
        r="15"
        fill="#E5E7EB"
        className="animate-float-delayed"
      />
      <circle
        cx="95"
        cy="35"
        r="20"
        fill="#E5E7EB"
        className="animate-float-delayed"
      />
      <circle
        cx="110"
        cy="40"
        r="15"
        fill="#E5E7EB"
        className="animate-float-delayed"
      />

      <circle
        cx="320"
        cy="50"
        r="12"
        fill="#E5E7EB"
        className="animate-float"
      />
      <circle
        cx="335"
        cy="47"
        r="16"
        fill="#E5E7EB"
        className="animate-float"
      />
      <circle
        cx="350"
        cy="50"
        r="12"
        fill="#E5E7EB"
        className="animate-float"
      />

      {/* Road */}
      <rect x="0" y="220" width="400" height="80" fill="#6B7280" />
      <rect
        x="0"
        y="240"
        width="400"
        height="4"
        fill="#F9FAFB"
        strokeDasharray="20 10"
      />

      {/* Truck Body */}
      <rect x="80" y="140" width="200" height="80" rx="8" fill="#1E40AF" />

      {/* Truck Cabin */}
      <rect x="280" y="160" width="60" height="60" rx="8" fill="#1E40AF" />

      {/* Windows */}
      <rect x="285" y="165" width="25" height="25" rx="4" fill="#BFDBFE" />
      <rect x="315" y="165" width="20" height="25" rx="4" fill="#BFDBFE" />

      {/* Windshield reflection */}
      <rect
        x="287"
        y="167"
        width="8"
        height="8"
        rx="2"
        fill="#FFFFFF"
        opacity="0.6"
      />

      {/* Truck Details */}
      <rect x="90" y="150" width="180" height="60" rx="4" fill="#F97316" />
      <rect x="100" y="160" width="160" height="40" rx="4" fill="#FFFFFF" />

      {/* FedExpress Logo on truck */}
      <text
        x="180"
        y="180"
        textAnchor="middle"
        className="text-sm font-bold"
        fill="#1E40AF"
      >
        Fed
      </text>
      <text
        x="180"
        y="195"
        textAnchor="middle"
        className="text-sm font-bold"
        fill="#F97316"
      >
        Express
      </text>

      {/* Wheels */}
      <circle cx="120" cy="230" r="25" fill="#374151" />
      <circle cx="120" cy="230" r="15" fill="#6B7280" />
      <circle cx="120" cy="230" r="8" fill="#9CA3AF" />

      <circle cx="250" cy="230" r="25" fill="#374151" />
      <circle cx="250" cy="230" r="15" fill="#6B7280" />
      <circle cx="250" cy="230" r="8" fill="#9CA3AF" />

      <circle cx="310" cy="230" r="25" fill="#374151" />
      <circle cx="310" cy="230" r="15" fill="#6B7280" />
      <circle cx="310" cy="230" r="8" fill="#9CA3AF" />

      {/* Exhaust */}
      <rect x="75" y="200" width="8" height="20" rx="4" fill="#6B7280" />

      {/* Exhaust smoke */}
      <circle
        cx="75"
        cy="190"
        r="3"
        fill="#D1D5DB"
        opacity="0.6"
        className="animate-float"
      />
      <circle
        cx="70"
        cy="185"
        r="4"
        fill="#D1D5DB"
        opacity="0.4"
        className="animate-float-delayed"
      />
      <circle
        cx="65"
        cy="178"
        r="5"
        fill="#D1D5DB"
        opacity="0.2"
        className="animate-float"
      />

      {/* Package icons floating */}
      <rect
        x="320"
        y="100"
        width="20"
        height="20"
        rx="2"
        fill="#F97316"
        className="animate-float"
      />
      <rect x="322" y="102" width="16" height="16" rx="1" fill="#FFFFFF" />
      <path
        d="M330 105 L330 115 M325 110 L335 110"
        stroke="#F97316"
        strokeWidth="2"
      />

      <rect
        x="50"
        y="120"
        width="15"
        height="15"
        rx="2"
        fill="#1E40AF"
        className="animate-float-delayed"
      />
      <rect x="52" y="122" width="11" height="11" rx="1" fill="#FFFFFF" />
      <path
        d="M57.5 125 L57.5 130 M55 127.5 L60 127.5"
        stroke="#1E40AF"
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default DeliveryTruckSVG;
