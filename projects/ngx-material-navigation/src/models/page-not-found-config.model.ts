/**
 * The configuration data of the 404 Not Found Page Component.
 */
export interface PageNotFoundConfig {
    /**
     * The title of the page.
     *
     * @default 'Page not found'
     */
    title?: string,
    /**
     * The message to display below the title.
     *
     * @default 'The page you are looking for might have been removed, had its name changed or is temporarily unavailable.'
     */
    message?: string,
    /**
     * The label on the button that sends the user back to the homepage.
     *
     * @default 'Homepage'
     */
    buttonLabel?: string,
    /**
     * The route that the user gets taken to when he clicks on the button.
     *
     * @default '/'
     */
    homeRoute?: string
}