import {
  Booking,
  BookingStack,
  GenieClient,
  Offer,
  PlusExperience,
} from '@/api/genie';
import data from '@/api/data/wdw';

export const [mk, ep, hs, ak] = data.parks;

export const mickey = {
  id: 'mickey',
  name: 'Mickey Mouse',
};
export const minnie = {
  id: 'minnie',
  name: 'Minnie Mouse',
};
export const pluto = {
  id: 'pluto',
  name: 'Pluto',
};
export const donald = {
  id: 'donald',
  name: 'Donald Duck',
  ineligibleReason: 'INVALID_PARK_ADMISSION' as const,
};

export const hm: PlusExperience = {
  id: '80010208',
  name: 'Haunted Mansion',
  type: 'ATTRACTION',
  standby: { available: true, waitTime: 30 },
  flex: { available: true, nextAvailableTime: '14:30:00' },
  priority: 7,
};

export const jc: PlusExperience = {
  id: '80010153',
  name: 'Jungle Cruise',
  type: 'ATTRACTION',
  standby: { available: true, waitTime: 45 },
  flex: {
    available: true,
    nextAvailableTime: '18:00:00',
    preexistingPlan: true,
  },
  priority: 1,
};

export const sm: PlusExperience = {
  id: '80010192',
  name: 'Splash Mountain',
  type: 'ATTRACTION',
  standby: { available: true, waitTime: 60 },
  flex: { available: true, nextAvailableTime: '12:45:00' },
  priority: 6,
};

export const bs = {
  id: '16491297',
  name: 'Barnstormer',
};

export const offer: Offer = {
  id: '123',
  start: { date: '2022-07-17', time: '11:25:00' },
  end: { date: '2022-07-17', time: '12:25:00' },
  changeStatus: 'NONE' as const,
};

export const bookings: Booking[] = [
  {
    experience: { id: hm.id, name: hm.name },
    park: mk,
    start: { date: '2022-07-17', time: '11:25:00' },
    end: { date: '2022-07-17', time: '12:25:00' },
    guests: [
      { ...mickey, entitlementId: 'hm1125_01' },
      { ...minnie, entitlementId: 'hm1125_02' },
      { ...pluto, entitlementId: 'hm1125_03' },
    ],
    multipleExperiences: false,
  },
  {
    experience: bs,
    park: mk,
    start: { date: '2022-07-17', time: '17:00:00' },
    end: { date: '2022-07-17', time: '18:00:00' },
    guests: [
      { ...mickey, entitlementId: 'bs1400_01' },
      { ...minnie, entitlementId: 'bs1400_02' },
    ],
    multipleExperiences: false,
  },
];

export const booking = bookings[0];

const stack = new BookingStack(false);
stack.update([bookings[0]]);
stack.update(bookings);

export const client = new GenieClient({
  origin: 'https://disneyworld.disney.go.com',
  getAuthData: () => ({ swid: '', accessToken: '' }),
  data,
}) as jest.Mocked<GenieClient>;

jest.spyOn(client, 'guests').mockResolvedValue({
  guests: [mickey, minnie, pluto],
  ineligibleGuests: [donald],
});
jest.spyOn(client, 'offer').mockResolvedValue(offer);
jest.spyOn(client, 'cancelOffer').mockResolvedValue(undefined);
jest.spyOn(client, 'book').mockResolvedValue({ ...bookings[0] });
jest.spyOn(client, 'cancelBooking').mockResolvedValue(undefined);
jest.spyOn(client, 'bookings').mockResolvedValue([...bookings]);
jest.spyOn(client, 'plusExperiences').mockResolvedValue([hm, sm, jc]);