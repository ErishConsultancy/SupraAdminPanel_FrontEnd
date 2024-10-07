const ErishLoginCheck = localStorage.getItem('ErishLogin');
const isErishLoggedIn = ErishLoginCheck !== 'false' && ErishLoginCheck !== null;

export const summaryPageTopMenu = {
	intro: { id: 'intro', text: 'Intro', path: '#intro', icon: 'Vrpano', subMenu: null },
	bootstrap: {
		id: 'bootstrap',
		text: 'Bootstrap Components',
		path: '#bootstrap',
		icon: 'BootstrapFill',
		subMenu: null,
	},
	storybook: {
		id: 'storybook',
		text: 'Storybook',
		path: '#storybook',
		icon: 'CustomStorybook',
		subMenu: null,
	},
	formik: {
		id: 'formik',
		text: 'Formik',
		path: '#formik',
		icon: 'CheckBox',
		subMenu: null,
	},
	apex: {
		id: 'apex',
		text: 'Apex Charts',
		path: '#apex',
		icon: 'AreaChart',
		subMenu: null,
	},
};

export const dashboardPagesMenu = {
	dashboard: {
		id: 'dashboard',
		text: 'Dashboard',
		path: '/',
		icon: 'Dashboard',
		subMenu: null,
	},
	
	LoanData: {
		id: 'LoanData',
		text: 'Loan Application',
		path: 'loan-application',
		icon: 'RecentActors',
	},
	CreditLoans: {
		id: 'CreditLoans',
		text: 'Credit Loans',
		path: 'credit-loans',
		icon: 'RecentActors',
	},
	GetLoans: {
		id: 'GetLoans',
		text: 'All Loans',
		path: 'get-loans',
		icon: 'RecentActors',
	},
	// LoanStatus: {
	// 	id: 'LoanStatus',
	// 	text: 'Loan Status',
	// 	path: 'loan-status',
	// 	icon: 'RecentActors',
	// },
	...(isErishLoggedIn ? {
		Customer: {
		id: 'Customer',
		text: 'Customer',
		path: 'Customer',
		icon: 'sticky_note_2',
		subMenu: null,
	},
} : {}),
	userlist: {
		id: 'userlist',
		text: 'Userlist',
		path: 'userlist',
		icon: 'sticky_note_2',
		subMenu: null,
	},
	...(isErishLoggedIn ? {
		nbfclist: {
			id: 'nbfclist',
			text: 'NBFC List',
			path: 'nbfclist',
			icon: 'sticky_note_2',
			subMenu: null,
		},
	} : {}),
	
	Roles: {
		id: 'roles',
		text: 'Roles',
		path: 'roles',
		icon: 'sticky_note_2',
		subMenu: null,
	},
	Loanscheme: {
		id: 'Loanscheme',
		text: 'Loan Scheme Name',
		path: 'loanscheme',
		icon: 'sticky_note_2',
		subMenu: null,
	},
	SMS: {
		id: 'SMS',
		text: 'SMS',
		path: 'sms',
		icon: 'sticky_note_2',
		subMenu: null,
	},
	PreApproveLoan: {
		id: 'PreApproveLoan',
		text: 'Pre Approve Loan',
		path: 'preapprove',
		icon: 'sticky_note_2',
		subMenu: null,
	},
	PreApproveLoanApplication: {
		id: 'PreApproveLoanApplication',
		text: 'Pre Approve Application',
		path: 'pre-approve-application',
		icon: 'sticky_note_2',
		subMenu: null,
	},
	SendMessage: {
		id: 'SendMessage',
		text: 'SendMessage',
		path: 'sensmessage',
		icon: 'sticky_note_2',
		subMenu: null,
		hide: true,
	},
	CreateLoans: {
		id: 'CreateLoans',
		text: 'Create Loan',
		path: 'create-loans',
		icon: 'RecentActors',
		hide: true,
	},
	
	
	userprofile: {
		id: 'userprofile',
		text: 'User Profile',
		path: 'userprofile',
		hide: true,
	},
	createsmstemplate: {
		id: 'createsmstemplate',
		text: 'Create SMS Template',
		path: 'createsmstemplate',
		hide: true,
	},
	changepassword: {
		id: 'changepassword',
		text: 'changepassword',
		path: 'changepassword',
		hide: true,
	},
	Createnbfc: {
		id: 'Createnbfc',
		text: 'Createnbfc',
		path: 'createnbfc',
		icon: 'ViewArray',
		hide: true,
	},
	Createcreditloan: {
		id: 'Createcreditloan',
		text: 'Create Credit Loan',
		path: 'createcreditloan',
		icon: 'ViewArray',
		hide: true,
	},
	LoanProfile: {
		id: 'LoanProfile',
		text: 'LoanProfile',
		path: 'loanprofile',
		icon: 'sticky_note_2',
		subMenu: null,
		hide: true,
	},
	Editnbfc: {
		id: 'Editnbfc',
		text: 'Edit NBFC',
		path: 'editnbfc',
		hide: true,
	},
	CreatePreApproveLoans: {
		id: 'CreatePreApproveLoans',
		text: 'Create PreApprove Loans',
		path: 'create-preapprove-loans',
		hide: true,
	},
	EditPreApprove: {
		id: 'EditPreApprove',
		text: 'Edit Pre Approve',
		path: 'edit-preapprove-loan',
		hide: true,
	},
	EditSMS: {
		id: 'EditSMS',
		text: 'Edit SMS',
		path: 'edit-sms',
		hide: true,
	},
	
	Editcreditloan: {
		id: 'Editcreditloan',
		text: 'Edit Credit Loan',
		path: 'edit-credit-loan',
		hide: true,
	},
	Createloanschemeloan: {
		id: 'Createloanschemeloan',
		text: 'Create Loan Schemeloan',
		path: 'createloanschemeloan',
		hide: true,
	},
	Editloanschemeloan: {
		id: 'Editloanschemeloan',
		text: 'Edit Loan Schemeloan',
		path: 'editloanschemeloan',
		hide: true,
	},
	LoanInstallments: {
		id: 'LoanInstallments',
		text: 'Loan Installments',
		path: 'loan-installments',
		hide: true,
	},
	EditLoans: {
		id: 'EditLoans',
		text: 'Edit Loans',
		path: 'editloans',
		hide: true,
	},
	Preloaninstalments: {
		id: 'Preloaninstalments',
		text: 'Preloan Instalments',
		path: 'Pre-loan-instalments',
		hide: true,
	},
	EditUser: {
		id: 'EditUser',
		text: 'Edit User',
		path: 'edituser',
		hide: true,
	},
	
	CreateRoles: {
					id: 'CreateRoles',
		 			text: 'Create Roles',
		 			path: 'createroles',
		 			icon: 'ViewArray',
		 			hide: true,
		 		},
		 		Editroles: {
		 			id: 'Editroles',
		 			text: 'Edit Roles',
		 			path: 'editroles',
		 			hide: true,
		 			},
	
	CreateUser: {
		id: 'CreateUser',
		text: 'Create User',
		path: 'createuser',
		hide: true,
		// icon: '',
		// subMenu: null,
	},
	// Createnbfc: {
	// 	// id: 'CreateUser',
	// 	// text: '',
	// 	path: 'createnbfc',
	// 	// icon: '',
	// 	// subMenu: null,
	// },
};

export const demoPagesMenu = {
	
	
	

	
	login: {
		id: 'login',
		text: 'Login',
		path: 'auth-pages/login',
		icon: 'Login',
		hide: true,
	},
	page404: {
		id: 'Page404',
		text: '404 Page',
		path: 'auth-pages/404',
		icon: 'ReportGmailerrorred',
		hide: true,
	},
};





export const productsExampleMenu = {
	companyA: { id: 'companyA', text: 'Company A', path: 'grid-pages/products', subMenu: null },
	companyB: { id: 'companyB', text: 'Company B', path: '/', subMenu: null },
	companyC: { id: 'companyC', text: 'Company C', path: '/', subMenu: null },
	companyD: { id: 'companyD', text: 'Company D', path: '/', subMenu: null },
};
