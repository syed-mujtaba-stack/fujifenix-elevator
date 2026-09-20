/**
 * Normalizes image paths to URL-safe static assets on Linux/Hostinger hosting environments.
 * Prevents 404s caused by ampersands (&), commas, single quotes, or complex URI encodings on Linux web servers.
 */
export function getSafeImageUrl(rawSrc: string | null | undefined): string {
  if (!rawSrc) return "/hero-elevator.jpg";

  const src = rawSrc.trim();

  // Passenger Elevator Cabin mappings
  if (/Passenger[%20\s]*Elevator[%20\s]*Cabin/i.test(src)) {
    if (/pattern[%20\s]*etched/i.test(src)) {
      return "/Elevators/passenger-elevator/pattern-etched.png";
    }
    if (/mirror[%20\s]*strip/i.test(src)) {
      return "/Elevators/passenger-elevator/mirror-strip.png";
    }
    if (/vertical[%20\s]*striped/i.test(src)) {
      return "/Elevators/passenger-elevator/vertical-striped.png";
    }
    if (/grid[%20\s]*ceiling/i.test(src)) {
      return "/Elevators/passenger-elevator/grid-ceiling.png";
    }
    if (/golden|gold/i.test(src)) {
      return "/Elevators/passenger-elevator/luxury-golden.png";
    }
    if (/machine[%20\s]*room[%20\s]*type/i.test(src) && !/mrl|less/i.test(src)) {
      return "/Elevators/passenger-elevator/blueprints/machine-room.png";
    }
    if (/mrl|machine-room-less/i.test(src)) {
      return "/Elevators/passenger-elevator/blueprints/mrl.png";
    }
    if (/hall[%20\s]*door/i.test(src)) {
      return "/Elevators/passenger-elevator/blueprints/hall-door.png";
    }
    if (/Passenger[%20\s]*Elevator[%20\s]*Cabin\.png/i.test(src)) {
      return "/Elevators/passenger-elevator/hero.png";
    }
  }

  // Home Elevators special character mappings
  if (/dual-tone[%20\s]*wood/i.test(src)) {
    return "/Elevators/Home%20Elevators/dual-tone-wood-steel.png";
  }
  if (/villa[%20\s]*home/i.test(src)) {
    return "/Elevators/Home%20Elevators/villa-wood-steel.png";
  }

  return src;
}
