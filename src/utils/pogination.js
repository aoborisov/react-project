export default function pogination(items, activePage, pageSize) {
    return [...items].splice((activePage - 1) * pageSize, pageSize)
}
