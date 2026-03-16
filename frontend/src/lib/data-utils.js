import { creators, events, performances } from '../data';

export function getPerformanceById(id) {
  return performances.find((item) => item.id === id);
}

export function getCreatorById(id) {
  return creators.find((item) => item.id === id);
}

export function getEventsWithPerformance() {
  return events.map((event) => ({
    ...event,
    performance: getPerformanceById(event.performanceId),
  }));
}

export function getPerformanceCast(performance) {
  return performance.creatorIds.map(getCreatorById).filter(Boolean);
}

export function getCreatorPerformances(creator) {
  return creator.performanceIds.map(getPerformanceById).filter(Boolean);
}
