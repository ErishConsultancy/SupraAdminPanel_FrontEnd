import React, { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import {
	dashboardPagesMenu,
	demoPagesMenu,
} from '../menu';
import Login from '../pages/presentation/auth/Login';
import NBFCList from '../pages/presentation/NBFCList';
import Createnbfc from '../pages/presentation/Createnbfc';
import EditRoles from '../pages/presentation/EditRoles';
import EditNBFC from '../pages/presentation/EditNBFC';
import CreateRoles from '../pages/presentation/CreateRoles';
import CreateloanSchemeName from '../pages/presentation/CreateloanSchemeName';
import EditloanSchemeName from '../pages/presentation/EditloanSchemeName';
import LoanScheme from '../pages/presentation/LoanScheme';
import LoanProfile from '../pages/presentation/LoanProfile';
import EditUser from '../pages/presentation/EditUser';
import CreditLoans from '../pages/presentation/CreditLoans';
import CreateCreditLoans from '../pages/presentation/CreateCreditLoans';
import EditCreditLoans from '../pages/presentation/EditCreditLoans';
import UserProfile from '../pages/presentation/UserProfile';
import ChangePassword from '../pages/presentation/auth/ChangePassword';
import SMSGetTemplate from '../pages/presentation/SMSGetTemplate';
import CreateSMSTemplate from '../pages/presentation/CreateSMSTemplate';
import EditSMSTemplate from '../pages/presentation/EditSMSTemplate';
import SendMessage from '../pages/presentation/SendMessage';
import PreApproveLoans from '../pages/presentation/PreApproveLoans';
import CreatePreapproveLoans from '../pages/presentation/CreatePreapproveLoans';
import EditPreApproveLoan from '../pages/presentation/EditPreApproveLoan';
import GetLoans from '../pages/presentation/GetLoans';
import EditLoans from '../pages/presentation/EditLoans';
import LoanInstallments from '../pages/presentation/LoanInstallments';

const LANDING = {
	DASHBOARD: lazy(() => import('../pages/presentation/dashboard/DashboardPage')),
	// DASHBOARD_BOOKING: lazy(() => import('../pages/presentation/dashboard/DashboardBookingPage')),
	Customer: lazy(() => import('../pages/presentation/CustomerPage')),
	UserList: lazy(() => import('../pages/presentation/UserListPage')),
	NBFCList: lazy(() => import('../pages/presentation/NBFCList')),
	UserProfile: lazy(() => import('../pages/presentation/UserProfile')),
	ChangePassword: lazy(() => import('../pages/presentation/ChangePassword')),
	CreateUser: lazy(() => import('../pages/presentation/CreateUser')),
	Createnbfc: lazy(() => import('../pages/presentation/Createnbfc')),
	LoanStatus: lazy(() => import('../pages/presentation/LoanStatus')),
	LoanData: lazy(() => import('../pages/presentation/LoanData')),
	CreateLoans: lazy(() => import('../pages/presentation/CreateLoans')),
	Roles: lazy(() => import('../pages/presentation/Roles')),
	LoanScheme: lazy(() => import('../pages/presentation/LoanScheme')),
	SMSGetTemplate: lazy(() => import('../pages/presentation/SMSGetTemplate')),
	EditRoles: lazy(() => import('../pages/presentation/EditRoles')),
	EditNBFC: lazy(() => import('../pages/presentation/EditNBFC')),
	CreateRoles: lazy(() => import('../pages/presentation/CreateRoles')),
	CreateloanSchemeName: lazy(() => import('../pages/presentation/CreateloanSchemeName')),
	EditloanSchemeName: lazy(() => import('../pages/presentation/EditloanSchemeName')),
	LoanProfile: lazy(() => import('../pages/presentation/LoanProfile')),
	EditUser: lazy(() => import('../pages/presentation/EditUser')),
	CreditLoans: lazy(() => import('../pages/presentation/CreditLoans')),
	CreateSMSTemplate: lazy(() => import('../pages/presentation/CreateSMSTemplate')),
	CreateCreditLoans: lazy(() => import('../pages/presentation/CreateCreditLoans')),
	EditCreditLoans: lazy(() => import('../pages/presentation/EditCreditLoans')),
	EditSMSTemplate: lazy(() => import('../pages/presentation/EditSMSTemplate')),
	SendMessage: lazy(() => import('../pages/presentation/SendMessage')),
	PreApproveLoans: lazy(() => import('../pages/presentation/PreApproveLoans')),
	CreatePreapproveLoans: lazy(() => import('../pages/presentation/CreatePreapproveLoans')),
	EditPreApproveLoan: lazy(() => import('../pages/presentation/EditPreApproveLoan')),
	GetLoans: lazy(() => import('../pages/presentation/GetLoans')),
	EditLoans: lazy(() => import('../pages/presentation/EditLoans')),
	LoanInstallments: lazy(() => import('../pages/presentation/LoanInstallments')),
};





const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};
// const APP = {
// 	PROJECT_MANAGEMENT: {
// 		PROJECTS_LIST: lazy(
// 			() => import('../pages/presentation/project-management/ProjectManagementsList'),
// 		),
// 		PROJECT: lazy(
// 			() => import('../pages/presentation/project-management/ProjectManagementsProject'),
// 		),
// 	},	
	
// };
const PAGE_LAYOUTS = {
	ASIDE: lazy(() => import('../pages/presentation/aside-types/DefaultAsidePage')),
	MINIMIZE_ASIDE: lazy(() => import('../pages/presentation/aside-types/MinimizeAsidePage')),
};

const CONTENT = {
	CONTENTS: lazy(() => import('../pages/documentation/content/ContentListPage')),
	TYPOGRAPHY: lazy(() => import('../pages/documentation/content/TypographyPage')),
	IMAGES: lazy(() => import('../pages/documentation/content/ImagesPage')),
	TABLES: lazy(() => import('../pages/documentation/content/TablesPage')),
	FIGURES: lazy(() => import('../pages/documentation/content/FiguresPage')),
};
const FORMS_PAGE = {
	FORMS: lazy(() => import('../pages/documentation/forms/FormsListPage')),
	FORM_GROUP: lazy(() => import('../pages/documentation/forms/FormGroupPage')),
	FORM_CONTROLS: lazy(() => import('../pages/documentation/forms/FormControlsPage')),
	SELECT: lazy(() => import('../pages/documentation/forms/SelectPage')),
	CHECKS_AND_RADIO: lazy(() => import('../pages/documentation/forms/ChecksAndRadioPage')),
	RANGE: lazy(() => import('../pages/documentation/forms/RangePage')),
	INPUT_GROUP: lazy(() => import('../pages/documentation/forms/InputGroupPage')),
	VALIDATION: lazy(() => import('../pages/documentation/forms/ValidationPage')),
	WIZARD: lazy(() => import('../pages/documentation/forms/WizardPage')),
};

// const ROUTES = {
// 	ROUTER: lazy(() => import('../pages/documentation/routes/RouterPage')),
// };

// const UTILITIES = {
// 	UTILITIES: lazy(() => import('../pages/documentation/utilities/UtilitiesListPage')),
// 	API: lazy(() => import('../pages/documentation/utilities/ApiPage')),
// 	BACKGROUND: lazy(() => import('../pages/documentation/utilities/BackgroundPage')),
// 	BORDERS: lazy(() => import('../pages/documentation/utilities/BordersPage')),
// 	COLORS: lazy(() => import('../pages/documentation/utilities/ColorsPage')),
// 	DISPLAY: lazy(() => import('../pages/documentation/utilities/DisplayPage')),
// 	FLEX: lazy(() => import('../pages/documentation/utilities/FlexPage')),
// 	FLOAT: lazy(() => import('../pages/documentation/utilities/FloatPage')),
// 	INTERACTIONS: lazy(() => import('../pages/documentation/utilities/InteractionsPage')),
// 	OVERFLOW: lazy(() => import('../pages/documentation/utilities/OverflowPage')),
// 	POSITION: lazy(() => import('../pages/documentation/utilities/PositionPage')),
// 	SHADOWS: lazy(() => import('../pages/documentation/utilities/ShadowsPage')),
// 	SIZING: lazy(() => import('../pages/documentation/utilities/SizingPage')),
// 	SPACING: lazy(() => import('../pages/documentation/utilities/SpacingPage')),
// 	TEXT: lazy(() => import('../pages/documentation/utilities/TextPage')),
// 	VERTICAL_ALIGN: lazy(() => import('../pages/documentation/utilities/VerticalAlignPage')),
// 	VISIBILITY: lazy(() => import('../pages/documentation/utilities/VisibilityPage')),
// };
const ICONS = {
	ICONS_LIST: lazy(() => import('../pages/documentation/icons/IconsListPage')),
	ICON: lazy(() => import('../pages/documentation/icons/IconPage')),
	MATERIAL: lazy(() => import('../pages/documentation/icons/MaterialPage')),
};
const CHARTS_PAGE = {
	CHART_LIST: lazy(() => import('../pages/documentation/charts/ChartsListPage')),
	GENERAL_USAGE: lazy(() => import('../pages/documentation/charts/ChartGeneralUsagePage')),
	SPARKLINE: lazy(() => import('../pages/documentation/charts/ChartSparklinePage')),
	LINE: lazy(() => import('../pages/documentation/charts/ChartLinePage')),
	AREA: lazy(() => import('../pages/documentation/charts/ChartAreaPage')),
	COLUMN: lazy(() => import('../pages/documentation/charts/ChartColumnPage')),
	BAR: lazy(() => import('../pages/documentation/charts/ChartBarPage')),
	MIXED: lazy(() => import('../pages/documentation/charts/ChartMixedPage')),
	TIMELINE: lazy(() => import('../pages/documentation/charts/ChartTimelinePage')),
	CANDLESTICK: lazy(() => import('../pages/documentation/charts/ChartCandlestickPage')),
	BOX_WHISKER: lazy(() => import('../pages/documentation/charts/ChartBoxWhiskerPage')),
	PIE_DONUT: lazy(() => import('../pages/documentation/charts/ChartPieDonutPage')),
	RADAR: lazy(() => import('../pages/documentation/charts/ChartRadarPage')),
	POLAR: lazy(() => import('../pages/documentation/charts/ChartPolarPage')),
	RADIAL_BAR: lazy(() => import('../pages/documentation/charts/ChartRadialBarPage')),
	BUBBLE: lazy(() => import('../pages/documentation/charts/ChartBubblePage')),
	SCATTER: lazy(() => import('../pages/documentation/charts/ChartScatterPage')),
	HEAT_MAP: lazy(() => import('../pages/documentation/charts/ChartHeatMapPage')),
	TREE_MAP: lazy(() => import('../pages/documentation/charts/ChartTreeMapPage')),
};
const EXTRA = {
	NOTIFICATION: lazy(() => import('../pages/documentation/extras/NotificationPage')),
	HOOKS: lazy(() => import('../pages/documentation/extras/HooksPage')),
};


const presentation: RouteProps[] = [
	{
		path: dashboardPagesMenu.dashboard.path,
		element: <LANDING.DASHBOARD />,
	},
	{
		path: dashboardPagesMenu.Customer.path,
		element: <LANDING.Customer />,
	},
	{
		path: dashboardPagesMenu.userlist.path,
		element: <LANDING.UserList />,
	},
	{
		path: dashboardPagesMenu.CreditLoans.path,
		element: <LANDING.CreditLoans />,
	},
	{
		path: dashboardPagesMenu.createsmstemplate.path,
		element: <LANDING.CreateSMSTemplate />,
	},
	{
		path: dashboardPagesMenu.SendMessage.path,
		element: <LANDING.SendMessage />,
	},
	{
		path: dashboardPagesMenu.nbfclist.path,
		element: <LANDING.NBFCList />,
	},
	{
		path: dashboardPagesMenu.userprofile.path,
		element: <LANDING.UserProfile />,
	},
	{
		path: dashboardPagesMenu.changepassword.path,
		element: <LANDING.ChangePassword />,
	},
	
	{
		path: `${dashboardPagesMenu.Editnbfc.path}/:clientId`,
		element: <LANDING.EditNBFC />,
	},
	
	{
		path: dashboardPagesMenu.CreateUser.path,
		element: <LANDING.CreateUser />,
	},
	{
		path: dashboardPagesMenu.Createnbfc.path,
		element: <LANDING.Createnbfc />,
	},
	{
		path: dashboardPagesMenu.CreatePreApproveLoans.path,
		element: <LANDING.CreatePreapproveLoans />,
	},
	{
		path: dashboardPagesMenu.Roles.path,
		element: <LANDING.Roles />,
	},
	// {
	// 	path: dashboardPagesMenu.LoanProfile.path,
	// 	element: <LANDING.LoanProfile />,
	// },
	{
		path: `${dashboardPagesMenu.LoanProfile.path}/:id`,
		element: <LANDING.LoanProfile />,
	},
	{
		path: `${dashboardPagesMenu.EditSMS.path}/:id`,
		element: <LANDING.EditSMSTemplate />,
	},
	{
		path: `${dashboardPagesMenu.LoanInstallments.path}/:id`,
		element: <LANDING.LoanInstallments />,
	},
	{
		path: dashboardPagesMenu.Loanscheme.path,
		element: <LANDING.LoanScheme />,
	},
	{
		path: dashboardPagesMenu.SMS.path,
		element: <LANDING.SMSGetTemplate />,
	},
	{
		path: dashboardPagesMenu.PreApproveLoan.path,
		element: <LANDING.PreApproveLoans />,
	},
	{
		path: dashboardPagesMenu.CreateRoles.path,
		element: <LANDING.CreateRoles />,
	},
	{
		path: dashboardPagesMenu.Createcreditloan.path,
		element: <LANDING.CreateCreditLoans />,
	},
	{
		path: dashboardPagesMenu.Createloanschemeloan.path,
		element: <LANDING.CreateloanSchemeName />,
	},
	{
		path: dashboardPagesMenu.GetLoans.path,
		element: <LANDING.GetLoans />,
	},
	{
		path: `${dashboardPagesMenu.Editloanschemeloan.path}/:id`,
		element: <LANDING.EditloanSchemeName />,
	},
	{
		path: `${dashboardPagesMenu.EditLoans.path}/:id`,
		element: <LANDING.EditLoans />,
	},
	{
		path: `${dashboardPagesMenu.Editcreditloan.path}/:id`,
		element: <LANDING.EditCreditLoans />,
	},
	{
		path: `${dashboardPagesMenu.Editroles.path}/:id`,
		element: <LANDING.EditRoles />,
	},
	{
		path: `${dashboardPagesMenu.EditPreApprove.path}/:id`,
		element: <LANDING.EditPreApproveLoan />,
	},
	{
		path: `${dashboardPagesMenu.EditUser.path}/:userId`,
		element: <LANDING.EditUser />,
	},
	{
		path: dashboardPagesMenu.LoanData.path,
		element: <LANDING.LoanData />,
	},
	{
		path: dashboardPagesMenu.CreateLoans.path,
		element: <LANDING.CreateLoans />,
	},
	
	// {
	// 	path: dashboardPagesMenu.LoanStatus.path,
	// 	element: <LANDING.LoanStatus />,
	// },
	
	{
		path: demoPagesMenu.page404.path,
		element: <AUTH.PAGE_404 />,
	},
	{
		path: demoPagesMenu.login.path,
		element: <Login />,
	},
	
	

	
	
];

const contents = [...presentation];

export default contents;
