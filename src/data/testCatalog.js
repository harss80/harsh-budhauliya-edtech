
export const testCatalog = {
    jee: {
        title: "Joint Entrance Examination (JEE)",
        sections: [
            {
                id: "air_rank",
                title: "AIR Rank Papers (All India)",
                description: "Compete at a national level with high-stakes full syllabus papers.",
                tests: [
                    { id: "jee_adv_air_1", title: "JEE Advanced AIR Ranker #1", duration: "180 min", questions: 54, type: "Full Syllabus", difficulty: "Hard" },
                    { id: "jee_main_air_1", title: "JEE Main AIR Ranker #1", duration: "180 min", questions: 90, type: "Full Syllabus", difficulty: "Medium" },
                    { id: "jee_main_air_2", title: "JEE Main AIR Ranker #2", duration: "180 min", questions: 90, type: "Full Syllabus", difficulty: "Hard" }
                ]
            },
            {
                id: "mock_test",
                title: "Standard Mock Tests",
                description: "Practice with standard NTA pattern mock tests.",
                tests: [
                    { id: "jee_mock_1", title: "JEE Main Full Mock #01", duration: "180 min", questions: 90, type: "Mock", difficulty: "Medium" },
                    { id: "jee_mock_2", title: "JEE Main Full Mock #02", duration: "180 min", questions: 90, type: "Mock", difficulty: "Medium" }
                ]
            },
            {
                id: "part_test",
                title: "Part Tests (Chapter-wise)",
                description: "Strengthen specific topics with focused tests.",
                tests: [
                    { id: "jee_part_phy_1", title: "Physics: Rotational Motion", duration: "60 min", questions: 25, type: "Part Test", difficulty: "Hard" },
                    { id: "jee_part_chem_1", title: "Chemistry: Thermodynamics", duration: "60 min", questions: 25, type: "Part Test", difficulty: "Medium" },
                    { id: "jee_part_math_1", title: "Maths: Calculus Basics", duration: "60 min", questions: 25, type: "Part Test", difficulty: "Medium" }
                ]
            }
        ]
    },
    neet: {
        title: "National Eligibility cum Entrance Test (NEET)",
        sections: [
            {
                id: "air_rank",
                title: "AIR Rank Papers",
                description: "National level papers to predict your All India Rank.",
                tests: [
                    { id: "neet_air_1", title: "NEET Grand Test AIR #1", duration: "200 min", questions: 200, type: "Full Syllabus", difficulty: "Hard" },
                    { id: "neet_air_2", title: "NEET Grand Test AIR #2", duration: "200 min", questions: 200, type: "Full Syllabus", difficulty: "Medium" }
                ]
            },
            {
                id: "mock_test",
                title: "Mock Tests",
                description: "Simulate the real exam environment.",
                tests: [
                    { id: "neet_mock_1", title: "NEET Full Syllabus Mock #01", duration: "200 min", questions: 200, type: "Mock", difficulty: "Medium" },
                    { id: "neet_mock_2", title: "NEET Full Syllabus Mock #02", duration: "200 min", questions: 200, type: "Mock", difficulty: "Medium" }
                ]
            },
            {
                id: "part_test",
                title: "Part Tests",
                description: "Chapter-wise practice for Physics, Chemistry, and Biology.",
                tests: [
                    { id: "neet_part_bio_1", title: "Biology: Human Physiology", duration: "45 min", questions: 50, type: "Part Test", difficulty: "Medium" },
                    { id: "neet_part_phy_1", title: "Physics: Ray Optics", duration: "45 min", questions: 45, type: "Part Test", difficulty: "Hard" }
                ]
            }
        ]
    },
    foundation: {
        title: "Foundation (Class 6-10)",
        sections: [
            {
                id: "board_crack",
                title: "Board Crack Series (Class 10)",
                description: "Specialized papers for Class 10th Board Exams.",
                tests: [
                    { id: "found_10_sci", title: "Class 10 Science Full Board Paper", duration: "180 min", questions: 35, type: "Board", difficulty: "Medium" },
                    { id: "found_10_math", title: "Class 10 Maths Standard Board Paper", duration: "180 min", questions: 38, type: "Board", difficulty: "Medium" }
                ]
            },
            {
                id: "olympiad",
                title: "Olympiad & Foundation (6th-9th)",
                description: "Prepare for NTSE, NSTSE, and early JEE/NEET foundation.",
                tests: [
                    { id: "found_9_nstse", title: "Class 9 NSTSE Mock", duration: "60 min", questions: 50, type: "Foundation", difficulty: "Hard" },
                    { id: "found_8_imo", title: "Class 8 IMO Level 1", duration: "60 min", questions: 50, type: "Foundation", difficulty: "Medium" },
                    { id: "found_7_sci", title: "Class 7 Science Builder", duration: "45 min", questions: 30, type: "Foundation", difficulty: "Easy" }
                ]
            },
            {
                id: "part_test",
                title: "Chapter-wise Tests",
                description: "Topic-specific tests for building strong fundamentals.",
                tests: [
                    { id: "found_part_alg", title: "Algebra Basics (Class 8-9)", duration: "40 min", questions: 20, type: "Part Test", difficulty: "Medium" },
                    { id: "found_part_force", title: "Force and Motion (Class 9)", duration: "40 min", questions: 25, type: "Part Test", difficulty: "Medium" }
                ]
            }
        ]
    }
};
