import { NavExternalLink, NavInternalLink } from './nav-link.model';
import { BaseNavElement } from './nav.model';

/**
 * A h1 Title.
 */
export interface NavTitle extends BaseNavElement {
    // eslint-disable-next-line jsdoc/require-jsdoc
    type: 'title',
    /**
     * The text to display inside the h1 tag.
     */
    title: string,
    /**
     * An icon to display left of the title.
     */
    icon?: string
}

/**
 * A h1 title that links to an internal angular route.
 */
export interface NavTitleWithInternalLink extends BaseNavElement {
    // eslint-disable-next-line jsdoc/require-jsdoc
    type: 'titleWithInternalLink',
    /**
     * The text to display inside the h1 tag.
     */
    title: string,
    /**
     * An icon to display left of the title.
     */
    icon?: string,
    /**
     * The link object. Contains the route and whether or not it should be opened in a new tab.
     */
    link: Omit<NavInternalLink, 'name' | 'icon' | 'type' | 'collapse' | 'position'>
}

/**
 * A h1 title that links to an external page.
 */
export interface NavTitleWithExternalLink extends BaseNavElement {
    // eslint-disable-next-line jsdoc/require-jsdoc
    type: 'titleWithExternalLink',
    /**
     * The text to display inside the h1 tag.
     */
    title: string,
    /**
     * An icon to display left of the title.
     */
    icon?: string,
    /**
     * The link object. Contains the href link and whether or not it should be opened in a new tab.
     */
    link: Omit<NavExternalLink, 'name' | 'icon' | 'type' | 'collapse' | 'position'>
}