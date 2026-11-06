import type { NavBarProps } from "../types/student"

export function NavBar({ navElements }: NavBarProps) {

    const navBarStyles = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "grey",
        paddingLeft: "25px",
        paddingRight: "25px",
        borderRadius: "50px",
        margin: "10px"
    }

    const navListStyles = {
        display: "flex",
        alignItems: "center",
        gap: "40px",
        padding: "0px",
        margin: "0px"

    }

    const ListStyles = { ...navListStyles }
    return (
        <>
            <section style={navBarStyles}>
                <h1>StudentHub</h1>
                <nav style={navListStyles}>
                    <ul style={ListStyles}>
                        {navElements.map((each) => (
                            <li key={each.name}>
                                <a href={each.link}>
                                    {each.name}
                                </a>
                            </li>
                        ))}

                    </ul>

                    <button type="button">
                        Toggle Theme
                    </button>
                </nav>

            </section>
        </>
    ) // return NavBar()
} // func NavBar() : ReactNode
