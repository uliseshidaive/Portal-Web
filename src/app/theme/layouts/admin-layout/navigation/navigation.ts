export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Menu',
    type: 'group',
    children: [
      {
        id: 'home',
        title: 'Inicio',
        type: 'item',
        icon: 'feather icon-home',     // Ícono opcional (Ajusta a tu librería)
        url: '/dashboard/default'
      },
      {
        id: 'inbound-list',
        title: 'Inbound Docs',
        type: 'item',
        icon: 'feather icon-download',
        url: '/dashboard/inbound-list'
      },
      {
        id: 'outbound-list',
        title: 'Outbound Docs',
        type: 'item',
        icon: 'feather icon-upload',
        url: '/dashboard/outbound-list'
      },
      {
        id: 'logs',
        title: 'Logs / Historial',
        type: 'item',
        icon: 'feather icon-activity',
        url: '/dashboard/logs'
      },
      {
        id: 'audit',
        title: 'Auditoría',
        type: 'item',
        icon: 'feather icon-check-circle',
        url: '/dashboard/audit'
      }
    ]
  }
];
