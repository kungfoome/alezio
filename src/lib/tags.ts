export function getFormattedTag(tag: string): string {
    return tag.replace(/\s+/g, '_').toLowerCase();
}
