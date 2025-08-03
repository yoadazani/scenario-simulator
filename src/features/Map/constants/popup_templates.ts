export const searchLocationPopupContent = `
                <div dir="rtl" class="bg-white rounded-lg shadow-md w-full overflow-hidden">
                    <div class="p-4 border-b border-gray-100">
                        <div class="flex items-center gap-3">
                            <div class="bg-blue-100 p-2 rounded-full flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-blue-800" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div class="text-right">
                                <p class="text-sm font-medium text-gray-500">כתובת</p>
                                <p class="text-lg font-semibold text-gray-900">{LongLabel}</p>
                            </div>
                        </div>
                    </div>
        
                    <div class="p-4 bg-gray-50">
                        <p class="text-sm font-medium text-gray-600 mb-2">קואורדינטות</p>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="bg-white p-2 rounded border border-gray-200">
                                <p class="text-xs text-gray-500">קו רוחב</p>
                                <p class="font-mono text-sm font-medium">{InputX}</p>
                            </div>
                            <div class="bg-white p-2 rounded border border-gray-200">
                                <p class="text-xs text-gray-500">קו אורך</p>
                                <p class="font-mono text-sm font-medium">{InputY}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `