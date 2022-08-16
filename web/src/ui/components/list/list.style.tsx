import { styled } from "@mui/material";

export const CardsList = styled("ul")`
    padding: 0;
    display: flex;
    gap: ${({ theme }) => theme.spacing(2)};
    flex-wrap: wrap;
`;
