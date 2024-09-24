"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type Props = {
	children?: ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
	return (
		<SessionProvider refetchInterval={30 * 60} basePath="/api/auth">
			{children}
		</SessionProvider>
	);
};
