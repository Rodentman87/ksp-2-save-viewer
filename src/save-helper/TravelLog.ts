import {
	SaveTravelLogData_0_1_0,
	SaveTravelLogObjectEvent_0_1_0,
	SaveTravelLogObject_0_1_0,
	SaveTravelLogStatistics_0_1_0,
} from "../types/save/SaveFile-0-1-0";
import { Save } from "./Save";

export class TravelLog {
	objects = new Map<string, TravelLogObject>();
	events: TravelLogEvent[];

	constructor(travelLogData: SaveTravelLogData_0_1_0, public save: Save) {
		travelLogData.Objects.forEach((object) =>
			this.objects.set(object.TravelObjectId, new TravelLogObject(object, this))
		);
		this.events = travelLogData.ObjectEvents.map(
			(event) => new TravelLogEvent(event, this)
		);
	}
}

export class TravelLogObject {
	TravelObjectId: string;
	Statistics: SaveTravelLogStatistics_0_1_0;
	events: TravelLogEvent[];

	constructor(object: SaveTravelLogObject_0_1_0, public travelLog: TravelLog) {
		this.TravelObjectId = object.TravelObjectId;
		this.Statistics = object.Statistics;
		this.events = [];
	}
}

export class TravelLogEvent {
	TravelObjectIds: string[];
	EventKey: string;
	UT: number;
	FlightReportArgs: string[];

	constructor(
		event: SaveTravelLogObjectEvent_0_1_0,
		public travelLog: TravelLog
	) {
		this.TravelObjectIds = event.TravelObjectIds;
		this.EventKey = event.EventKey;
		this.UT = event.UT;
		this.FlightReportArgs = event.FlightReportArgs;
		this.TravelObjectIds.forEach((id) => {
			const object = travelLog.objects.get(id);
			if (object) {
				object.events.push(this);
			}
		});
	}
}
