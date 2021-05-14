export declare type IdRefreshTokenType = {
    status: "NOT_EXISTS" | "MAY_EXIST";
} | {
    status: "EXISTS";
    token: string;
};
