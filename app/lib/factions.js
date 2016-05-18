export function humanizeFaction(faction) {
  switch (faction) {
    case 'NEUTRAL': return 'Balance';
    case 'ORDER': return 'Order';
    case 'CHAOS': return 'Chaos';
  }
}
