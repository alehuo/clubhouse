import { SvgIconProps } from '@material-ui/core/SvgIcon';
import ChatIcon from '@material-ui/icons/Chat';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import SchoolIcon from '@material-ui/icons/School';
import TodayIcon from '@material-ui/icons/Today';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

export interface NavButton {
    url: string;
    icon: React.ComponentType<any>;
    text: string;
    auth: boolean;
}

const navButtons: NavButton[] = [
    {
        url: '/',
        icon: HomeIcon,
        text: 'Home',
        auth: false,
    },
    {
        url: '/news',
        icon: ChatIcon,
        text: 'News',
        auth: false,
    },
    {
        url: '/calendar',
        icon: TodayIcon,
        text: 'Calendar',
        auth: false,
    },
    {
        url: '/keys',
        icon: VpnKeyIcon,
        text: 'Keys',
        auth: true,
    },
    {
        url: '/studentunions',
        icon: SchoolIcon,
        text: 'Student unions',
        auth: true,
    },
    {
        url: '/Documents',
        icon: FormatListNumberedIcon,
        text: 'Documents',
        auth: false,
    },
    {
        url: '/users',
        icon: PeopleIcon,
        text: 'Users',
        auth: true,
    },
];

export { navButtons };
