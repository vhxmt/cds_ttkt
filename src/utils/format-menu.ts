export default function convertClassName(className: string) {
    switch (className) {
        case 'container':
            return 'flex-none w-1/3';
        case 'title':
            return 'font-inter font-bold text-[14px] text-[#BD1E1E] mb-4';
        case 'link':
            return 'text-[#BD1E1E] hover:underline';
        case 'text':
            return 'text-l mb-4 font-inter font-bold text-[14px] text-[#BD1E1E]';
        case 'list':
            return 'list-disc pl-5 mt-2 text-[13px] text-[#BD1E1E]';
        case 'listItem':
            return 'text-[#BD1E1E] hover:underline';
        case 'hoverLink':
            return 'hover:underline';
        case 'subMenu':
            return 'text-l list-disc list-inside ml-4 text-[#BD1E1E] ';
        case 'subItem':
            return 'hover:underline';

        default:
            return '';
    }
}
