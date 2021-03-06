import React from 'react';
import styled from 'styled-components';

const FieldContainer = styled.li`
	display: flex;
	margin: 0;
	padding: 0;

	@media screen and ( max-width: 559px) {
		flex-direction: column;
	}
`;

const Field = styled.div`
	display: flex;
	flex: 1 1 auto;
	flex-direction: column;
	order: 2;
`;

const NetlifyCaptcha = () => {
	return (
		<FieldContainer>
			<Field data-netlify-recaptcha></Field>
		</FieldContainer>
	);
};

export default NetlifyCaptcha;
