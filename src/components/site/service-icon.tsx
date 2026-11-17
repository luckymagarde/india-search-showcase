import { Scale, MapPin, GraduationCap, Hammer, PawPrint, Monitor, Car, Search, Link2, Globe, Languages, Building2, Compass, Landmark, Flag, ShoppingBag, House, HeartPulse, Anchor, MapPinned, Palette, Code2, Workflow, Laptop, Settings, PanelsTopLeft, MonitorSmartphone, LayoutTemplate, Braces } from 'lucide-react';

const icons = { Scale, MapPin, GraduationCap, Hammer, PawPrint, Monitor, Car, Search, Link2, Globe, Languages, Building2, Compass, Landmark, Flag, ShoppingBag, House, HeartPulse, Anchor, MapPinned, Palette, Code2, Workflow, Laptop, Settings, PanelsTopLeft, MonitorSmartphone, LayoutTemplate, Braces };
export function ServiceIcon({name}:{name:string}) {
 const Icon = icons[name as keyof typeof icons] ?? Search;
 return <Icon aria-hidden="true" />;
}