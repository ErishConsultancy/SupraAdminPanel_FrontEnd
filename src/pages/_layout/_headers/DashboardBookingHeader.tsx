import React from 'react';
import classNames from 'classnames';
import Header, { HeaderLeft, HeaderRight } from '../../../layout/Header/Header';
import CommonHeaderChat from './CommonHeaderChat';
import useDarkMode from '../../../hooks/useDarkMode';
import Search from '../../../components/Search';

const DashboardBookingHeader = () => {
	const { darkModeStatus } = useDarkMode();
	return (
		<Header>
			<HeaderLeft>
				<Search />
			</HeaderLeft>
			<HeaderRight>
				<CommonHeaderChat />
			</HeaderRight>
		</Header>
	);
};

export default DashboardBookingHeader;
