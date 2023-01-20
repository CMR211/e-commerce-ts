import styled from "styled-components"

type TextProps = {
    variant: "normal" | "section" | "bold" | "small"
    children: string
}

const SectionTitle = styled.h2`
    font-size: 1.8rem;
`

const NormalText = styled.p`
    font-size: 1em;
`

export function Text({ variant, children }: TextProps) {
    return (
        <>
            {variant === "section" && <SectionTitle>{children}</SectionTitle>}
            {variant === "normal" && <NormalText>{children}</NormalText>}
        </>
    )
}
