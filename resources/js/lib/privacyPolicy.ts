/** The database may not contain a privacy policy yet. */
export type PrivacyPolicyData = {
    content?: string | null;
} | null | undefined;

/** Return a safe string even if the Inertia prop or its content is missing. */
export function getPrivacyPolicyContent(policy: PrivacyPolicyData): string {
    return typeof policy?.content === 'string' ? policy.content : '';
}

/** Quill sometimes submits markup such as <p><br></p> for an empty editor. */
export function hasPrivacyPolicyContent(content: string): boolean {
    return content
        .replace(/<[^>]*>/g, '')
        .replace(/&(?:nbsp|#160|#xA0);/gi, ' ')
        .trim().length > 0;
}
