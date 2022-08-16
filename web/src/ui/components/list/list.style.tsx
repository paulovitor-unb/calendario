/*
    Adiciona configurações CSS para o elemento CardsList baseado na tag ul
*/

import { styled } from "@mui/material";

export const CardsList = styled("ul")`
    padding: 0;
    display: flex;
    gap: ${({ theme }) => theme.spacing(2)};
    flex-wrap: wrap;
`;
