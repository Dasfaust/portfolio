const StatsGrid = ({stats}) =>
{
	return (
		<div className="flex flex-wrap w-fit mx-auto gap-2">
			{stats.map((stat) => {
				return (
					<div className="flex flex-col border rounded-sm bg-fuchsia-100 border-fuchsia-200 p-1 mx-auto">
						<div className="flex flex-row gap-1 border-b border-b-fuchsia-300 mx-auto">
							<span className="font-bold font-mono">
								{stat.number}
							</span>
							<span>
								{stat.title}
							</span>
						</div>
						{stat.comment != null &&
						<span className="italic text-sm text-stone-700 mx-auto">{stat.comment}</span>}
					</div>
				);
			})}
		</div>
	);
};

export default StatsGrid;