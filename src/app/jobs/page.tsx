import JobCard from "@/components/jobcard/JobCard"

export default function page() {
    return (
        // these cards shall be moved in a container.
        <>
            <JobCard
                id={1}
                name="tiger"
                type="microjob"
                location="Mohakhali, Dhaka"
                title="Deliver Documents"
                description="Deliver some gifts to my girlfriend in Mirpur, Dhaka"
                tags={["paid", "single task", "delivery"]}
                salary="500 BDT"
                posterAvatar="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                posterId={123}
                postedTime="2024-12-06T14:00:00Z"
            />

            <JobCard
                id={2}
                name="chicken"
                type="community"
                location="KUET, Fulbari Gate, Khulna"
                title="Volunteer for Cleanup"
                description="Make KUET plastic free. Remove all types of plastics from academic and resident areas."
                tags={["non-paid", "volunteer"]}
                posterAvatar="https://robohash.org/mail@ashallendesign.co.uk"
                posterId={124}
                postedTime="2024-12-07T18:00:00Z"
            />
        </>
    )
}